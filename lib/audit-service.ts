import type { NextRequest } from "next/server"
import dbConnect from "./dbConnect"
import AuditLog from "@/models/AuditLog"

export interface AuditEntry {
  userId: string
  action: string
  resource: string
  resourceId?: string
  details: Record<string, any>
  severity?: "low" | "medium" | "high" | "critical"
}

export class AuditService {
  static async log(entry: AuditEntry, req?: NextRequest): Promise<void> {
    try {
      await dbConnect()

      const auditEntry = {
        ...entry,
        ipAddress: req?.ip || req?.headers.get("x-forwarded-for") || "unknown",
        userAgent: req?.headers.get("user-agent") || "unknown",
        severity: entry.severity || "low",
      }

      await AuditLog.create(auditEntry)
    } catch (error) {
      console.error("Failed to create audit log:", error)
      // Don't throw error to avoid breaking the main operation
    }
  }

  static async logDonationStatusChange(
    userId: string,
    donationId: string,
    oldStatus: string,
    newStatus: string,
    notes?: string,
    req?: NextRequest,
  ): Promise<void> {
    await this.log(
      {
        userId,
        action: "update_donation_status",
        resource: "donation",
        resourceId: donationId,
        details: {
          oldStatus,
          newStatus,
          notes,
        },
        severity: newStatus === "rejected" ? "medium" : "low",
      },
      req,
    )
  }

  static async logUserAction(
    userId: string,
    action: string,
    resource: string,
    details: Record<string, any>,
    req?: NextRequest,
  ): Promise<void> {
    await this.log(
      {
        userId,
        action,
        resource,
        details,
      },
      req,
    )
  }

  static async logAdminAction(
    adminId: string,
    action: string,
    targetResource: string,
    targetId: string,
    details: Record<string, any>,
    req?: NextRequest,
  ): Promise<void> {
    await this.log(
      {
        userId: adminId,
        action,
        resource: targetResource,
        resourceId: targetId,
        details,
        severity: "high",
      },
      req,
    )
  }

  static async getAuditLogs(
    filters: {
      userId?: string
      action?: string
      resource?: string
      startDate?: Date
      endDate?: Date
    },
    limit = 100,
    offset = 0,
  ): Promise<any[]> {
    await dbConnect()

    const query: any = {}

    if (filters.userId) query.userId = filters.userId
    if (filters.action) query.action = filters.action
    if (filters.resource) query.resource = filters.resource
    if (filters.startDate || filters.endDate) {
      query.timestamp = {}
      if (filters.startDate) query.timestamp.$gte = filters.startDate
      if (filters.endDate) query.timestamp.$lte = filters.endDate
    }

    return await AuditLog.find(query).populate("userId", "name email").sort({ timestamp: -1 }).limit(limit).skip(offset)
  }
}
