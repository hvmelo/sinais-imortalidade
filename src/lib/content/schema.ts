/**
 * Canonical frontmatter schemas with runtime validation.
 *
 * Used by loader.ts to validate parsed frontmatter before returning typed objects.
 * Schema violations throw meaningful errors — never silently fail.
 *
 * MDX migration note:
 * The same schema validation applies to MDX frontmatter. Schema is format-agnostic.
 */

import type { SignalFrontmatter, AnalysisFrontmatter } from './types';

// ─── Errors ──────────────────────────────────────────────────────────────────

export class SchemaValidationError extends Error {
  constructor(
    public readonly contentType: 'Signal' | 'Analysis',
    public readonly field: string,
    message: string,
  ) {
    super(`[${contentType}] ${field}: ${message}`);
    this.name = 'SchemaValidationError';
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((v) => typeof v === 'string' && v.trim().length > 0);
}

function isISODate(val: unknown): boolean {
  if (!isNonEmptyString(val)) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val));
}

// ─── Signal Schema ─────────────────────────────────────────────────────────────

const SIGNAL_REQUIRED = ['title', 'slug', 'date', 'description', 'tags'] as const;

export function validateSignalFrontmatter(
  raw: Record<string, unknown>,
): asserts raw is Record<string, unknown> & SignalFrontmatter {
  for (const field of SIGNAL_REQUIRED) {
    if (raw[field] === undefined || raw[field] === null) {
      throw new SchemaValidationError('Signal', field, 'required field is missing');
    }
  }

  if (!isNonEmptyString(raw.title)) {
    throw new SchemaValidationError('Signal', 'title', 'must be a non-empty string');
  }
  if (!isNonEmptyString(raw.slug)) {
    throw new SchemaValidationError('Signal', 'slug', 'must be a non-empty string');
  }
  if (!isISODate(raw.date)) {
    throw new SchemaValidationError('Signal', 'date', 'must be a valid ISO 8601 date (YYYY-MM-DD)');
  }
  if (!isNonEmptyString(raw.description)) {
    throw new SchemaValidationError('Signal', 'description', 'must be a non-empty string');
  }
  if (!isStringArray(raw.tags)) {
    throw new SchemaValidationError('Signal', 'tags', 'must be an array of non-empty strings');
  }
  if (raw.tags.length === 0) {
    throw new SchemaValidationError('Signal', 'tags', 'must have at least one tag');
  }

  // Optional fields — validate type if present
  if (raw.source !== undefined && !isNonEmptyString(raw.source)) {
    throw new SchemaValidationError('Signal', 'source', 'if present, must be a string');
  }
  if (raw.url !== undefined && !isNonEmptyString(raw.url)) {
    throw new SchemaValidationError('Signal', 'url', 'if present, must be a string');
  }
  if (
    raw.urgency !== undefined &&
    !['low', 'medium', 'high'].includes(raw.urgency as string)
  ) {
    throw new SchemaValidationError(
      'Signal',
      'urgency',
      'if present, must be one of: low, medium, high',
    );
  }
}

// ─── Analysis Schema ────────────────────────────────────────────────────────────

const ANALYSIS_REQUIRED = ['title', 'slug', 'date', 'description', 'thesis', 'sources'] as const;

export function validateAnalysisFrontmatter(
  raw: Record<string, unknown>,
): asserts raw is Record<string, unknown> & AnalysisFrontmatter {
  for (const field of ANALYSIS_REQUIRED) {
    if (raw[field] === undefined || raw[field] === null) {
      throw new SchemaValidationError('Analysis', field, 'required field is missing');
    }
  }

  if (!isNonEmptyString(raw.title)) {
    throw new SchemaValidationError('Analysis', 'title', 'must be a non-empty string');
  }
  if (!isNonEmptyString(raw.slug)) {
    throw new SchemaValidationError('Analysis', 'slug', 'must be a non-empty string');
  }
  if (!isISODate(raw.date)) {
    throw new SchemaValidationError(
      'Analysis',
      'date',
      'must be a valid ISO 8601 date (YYYY-MM-DD)',
    );
  }
  if (!isNonEmptyString(raw.description)) {
    throw new SchemaValidationError('Analysis', 'description', 'must be a non-empty string');
  }
  if (!isNonEmptyString(raw.thesis)) {
    throw new SchemaValidationError('Analysis', 'thesis', 'must be a non-empty string');
  }
  if (!isStringArray(raw.sources)) {
    throw new SchemaValidationError('Analysis', 'sources', 'must be an array of non-empty strings');
  }
  if (raw.sources.length === 0) {
    throw new SchemaValidationError('Analysis', 'sources', 'must have at least one source');
  }

  // Optional fields
  if (raw.relatedSignals !== undefined && !isStringArray(raw.relatedSignals)) {
    throw new SchemaValidationError(
      'Analysis',
      'relatedSignals',
      'if present, must be an array of strings',
    );
  }
  if (raw.readTime !== undefined && typeof raw.readTime !== 'number') {
    throw new SchemaValidationError(
      'Analysis',
      'readTime',
      'if present, must be a number (minutes)',
    );
  }
}
