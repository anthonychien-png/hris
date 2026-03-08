# H&M HRIS System — Specification Summary

**System Type:** Enterprise HRIS (Workday/Dayforce-style)
**Tenant Model:** Single-company instance
**Seed Company:** H&M (Retail Industry)

---

## 1. System Architecture

- Single-company instance scoped to **H&M**
- All employees must belong to a **branch** and a **department**
- Every employee has **exactly one manager**, except the top executive

---

## 2. Core Modules

### Pay Module
- **Supported frequencies:** Weekly, Bi-weekly, Semi-monthly, Monthly, Annual
- Generate, preview, commit (admin-only), and store payroll history
- Earnings history maintained per employee
- Seed data covers multiple 2025 pay cycles across all frequencies

### Time Module
- Tracks **regular hours**, **overtime** (non-exempt only), and **PTO**
- Exempt employees: Semi-monthly / Monthly timesheets
- Non-exempt employees: Weekly hourly-based timesheets
- **Forms:** Time Entry Submission, PTO Submission, PTO Approval (managers only)

### Benefits Module
- **Plans:** Dental, Vision, Drug, General Health
- Enrollment tracking, claim submission, usage and history per employee

---

## 3. Employee Data Model

| Field | Description |
|---|---|
| Name | Full name |
| Title | Job title |
| Employment Type | Exempt / Non-exempt |
| Compensation Type | Salary / Hourly |
| Department | One of six departments |
| Branch | Assigned branch node |
| Manager | Single reporting manager |
| Status | Active / Inactive |
| Job Level | C-Level / Director / Manager / Working |

---

## 4. Organisational Structure

### Departments
Sales · Marketing · IT · Operations · HR · Engineering

### Job Level Hierarchy
- **C-Level:** Chief Revenue Officer, Chief Marketing Officer, Chief Information Officer, Chief HR Officer, Chief Technology Officer
- **Director Level**
- **Manager Level**
- **Working Level**

### Branch Hierarchy
Multi-level, admin-managed. All employees must be assigned to a branch.

---

## 5. Manager–Employee Relationship Rules

- One manager → many employees
- One employee → only one manager
- **Validations:** no multiple managers, manager must be active and exist in system, no circular hierarchy
- Dedicated CRUD form for creating, updating, and deleting relationships

---

## 6. Role-Based Access Control (RBAC)

| Capability | Employee | Manager | HR Admin |
|---|---|---|---|
| Submit time / PTO / claims | ✓ | ✓ | ✓ |
| View own data | ✓ | ✓ | ✓ |
| View direct reports' data | — | ✓ | ✓ |
| Approve PTO (direct reports only) | — | ✓ | ✓ |
| Manage employees & branches | — | — | ✓ |
| Commit payroll | — | — | ✓ |
| Full reporting access | — | — | ✓ |

---

## 7. Admin Section

HR Administrator capabilities:
- Create, update, and deactivate employees
- Build and manage branch hierarchy (create, update, delete nodes)
- Assign employees to branches
- Manage manager–employee relationships
- Commit payroll

---

## 8. Reporting Module

| Category | Reports |
|---|---|
| **Payroll** | Weekly, Bi-weekly, Semi-monthly, Monthly, By Department, Summary |
| **Benefits** | Consumed by employee, Enrollment summary, Cost summary |
| **Time** | Timesheet (Exempt), Timesheet (Non-exempt), Overtime, PTO Balances |
| **Workforce** | Headcount by dept/branch/level, Active vs Inactive, Manager span-of-control |

---

## 9. Required Forms

1. Time Entry Submission Form
2. PTO Submission Form
3. PTO Approval Form (Manager)
4. Benefits Claim Submission Form
5. Employee Create / Update / Inactivate Form (Admin)
6. Manager–Employee Relationship Form (CRUD)
7. Branch Hierarchy Management Form (Admin)
8. Payroll Commit Interface

---

## 10. Seed Data — H&M Retail Scenario

**Employees include:**
- C-Level executives (CRO, CMO, CIO, CHRO, CTO)
- Directors per department
- Managers (store & corporate)
- Store associates and corporate staff
- Named employees: **John Doe**, **Jane Doe**, **Sam Smith**

**Compensation mix:** Salaried (exempt) and Hourly (non-exempt)

**Time data:** Exempt semi-monthly/monthly entries; Non-exempt weekly with PTO and overtime samples

**Pay periods:** Multiple 2025 cycles generated for Weekly, Bi-weekly, Semi-monthly, and Monthly frequencies
