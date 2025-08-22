// Security utilities for input validation and sanitization

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface SanitizedData {
  [key: string]: string;
}

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/expression\(/gi, '') // Remove CSS expressions
    .replace(/url\(/gi, '') // Remove CSS url functions
    .replace(/eval\(/gi, '') // Remove eval function calls
    .replace(/document\./gi, '') // Remove document object access
    .replace(/window\./gi, '') // Remove window object access
    .replace(/localStorage\./gi, '') // Remove localStorage access
    .replace(/sessionStorage\./gi, ''); // Remove sessionStorage access
};

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.org', 'guerrillamail.com', '10minutemail.com',
    'mailinator.com', 'yopmail.com', 'throwaway.email'
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) {
    return { isValid: false, error: 'Please use a valid email address' };
  }
  
  return { isValid: true };
};

// Phone number validation
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) return { isValid: true }; // Optional field
  
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Name is required' };
  }
  
  const sanitizedName = sanitizeInput(name);
  
  if (sanitizedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (sanitizedName.length > 100) {
    return { isValid: false, error: 'Name must be less than 100 characters' };
  }
  
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(sanitizedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }
  
  return { isValid: true };
};

// ISBN validation
export const validateISBN = (isbn: string): ValidationResult => {
  if (!isbn) {
    return { isValid: false, error: 'ISBN is required' };
  }
  
  const cleanISBN = isbn.replace(/[\s\-]/g, '');
  
  // ISBN-10 or ISBN-13 validation
  if (cleanISBN.length === 10) {
    return validateISBN10(cleanISBN);
  } else if (cleanISBN.length === 13) {
    return validateISBN13(cleanISBN);
  } else {
    return { isValid: false, error: 'ISBN must be 10 or 13 digits' };
  }
};

// ISBN-10 validation
const validateISBN10 = (isbn: string): ValidationResult => {
  if (!/^\d{9}[\dX]$/.test(isbn)) {
    return { isValid: false, error: 'Invalid ISBN-10 format' };
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(isbn[i]) * (10 - i);
  }
  
  const checkDigit = isbn[9] === 'X' ? 10 : parseInt(isbn[9]);
  sum += checkDigit;
  
  if (sum % 11 !== 0) {
    return { isValid: false, error: 'Invalid ISBN-10 check digit' };
  }
  
  return { isValid: true };
};

// ISBN-13 validation
const validateISBN13 = (isbn: string): ValidationResult => {
  if (!/^\d{13}$/.test(isbn)) {
    return { isValid: false, error: 'Invalid ISBN-13 format' };
  }
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(isbn[i]) * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  
  if (parseInt(isbn[12]) !== checkDigit) {
    return { isValid: false, error: 'Invalid ISBN-13 check digit' };
  }
  
  return { isValid: true };
};

// Message validation
export const validateMessage = (message: string): ValidationResult => {
  if (!message) return { isValid: true }; // Optional field
  
  const sanitizedMessage = sanitizeInput(message);
  
  if (sanitizedMessage.length > 1000) {
    return { isValid: false, error: 'Message must be less than 1000 characters' };
  }
  
  return { isValid: true };
};

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (now - attempt.timestamp > this.windowMs) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// CSRF token generation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Validate CSRF token
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken && token.length === 64;
};

// Content Security Policy headers
export const getCSPHeaders = (): Record<string, string> => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
};

// Sanitize form data
export const sanitizeFormData = (data: Record<string, any>): SanitizedData => {
  const sanitized: SanitizedData = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = String(value);
    }
  }
  
  return sanitized;
};

// Validate form data
export const validateFormData = (data: Record<string, any>) => {
  const errors: Record<string, string> = {};
  
  // Validate name
  const nameValidation = validateName(data.fullName || '');
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.error!;
  }
  
  // Validate email
  const emailValidation = validateEmail(data.email || '');
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }
  
  // Validate phone (optional)
  const phoneValidation = validatePhone(data.phone || '');
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error!;
  }
  
  // Validate ISBN
  const isbnValidation = validateISBN(data.ebookISBN || '');
  if (!isbnValidation.isValid) {
    errors.ebookISBN = isbnValidation.error!;
  }
  
  // Validate ebook name
  const ebookNameValidation = validateName(data.ebookName || '');
  if (!ebookNameValidation.isValid) {
    errors.ebookName = ebookNameValidation.error!;
  }
  
  // Validate message (optional)
  const messageValidation = validateMessage(data.message || '');
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
