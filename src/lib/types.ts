import { DefaultSession } from "next-auth";

export enum UserRole {
  SUPER_ADMIN = "সুপার অ্যাডমিন",
  SALES = "সেলস এক্সিকিউটিভ",
  FINANCE = "ফাইন্যান্স",
  PROJECT_MANAGER = "প্রজেক্ট ম্যানেজার",
}

export enum ProjectStatus {
  UPCOMING = "আসন্ন",
  ONGOING = "চলমান",
  COMPLETED = "সম্পন্ন",
}

export enum UnitStatus {
  AVAILABLE = "উপলব্ধ",
  BOOKED = "বুকড",
  SOLD = "বিক্রিত",
  RESERVED = "রিজার্ভড",
}

export enum LeadStatus {
  NEW = "নতুন",
  CONTACTED = "যোগাযোগ করা হয়েছে",
  INTERESTED = "আগ্রহী",
  NOT_INTERESTED = "আগ্রহী নয়",
  CONVERTED = "কনভোর্টেড",
}

export enum BookingStatus {
  PENDING = "পেন্ডিং",
  APPROVED = "অনুমোদিত",
  CANCELLED = "বাতিল",
}

export enum PaymentMethod {
  CASH = "নগদ",
  BANK = "ব্যাংক",
  CHEQUE = "চেক",
  ONLINE = "অনলাইন",
  BKASH = "বিকাশ",
}

export enum PaymentType {
  BOOKING = "বুকিং",
  DOWN_PAYMENT = "ডাউন পেমেন্ট",
  INSTALLMENT = "কিস্তি",
  AD_HOC = "অন্যান্য",
}

// Data Interfaces
export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  status: ProjectStatus;
  images: string[];
  features: string[];
  mapLink?: string;
  videoLink?: string;
  totalUnits?: number;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUnit {
  _id: string;
  project: string | IProject;
  unitNumber: string;
  floor: string;
  size: string;
  price: number;
  status: UnitStatus;
  facing?: string;
  bedRooms?: number;
  bathRooms?: number;
  balconies?: number;
  floorPlan?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  project?: string | IProject;
  source: string;
  status: LeadStatus;
  assignedTo?: string | IUser;
  followUpDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IClient {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  nid?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBooking {
  _id: string;
  project: string | IProject;
  unit: string | IUnit;
  client: string | IClient;
  totalAmount: number;
  bookingAmount: number;
  downPayment: number;
  balanceAmount: number;
  installmentCount: number;
  installmentAmount: number;
  bookingDate: string;
  status: BookingStatus;
  documents: string[];
  salesPerson?: string | IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPayment {
  _id: string;
  booking: string | IBooking;
  client: string | IClient;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  paymentType: PaymentType;
  receiptNumber: string;
  transactionId?: string;
  description?: string;
  receivedBy?: string | IUser;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  designation?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// NextAuth Augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    id: string;
  }
}
