/**
 * Canonical frontmatter schemas with runtime validation.
 *
 * Used by loader.ts to validate parsed frontmatter before returning typed objects.
 * Schema violations throw meaningful errors — never silently fail.
 *
 * MDX migration note:
 * The same schema validation applies to MDX frontmatter. Schema is format-agnostic.
 */

import type { SinalFrontmatter, AnaliseFrontmatter } from './types';

// ─── Errors ──────────────────────────────────────────────────────────────────

export class SchemaValidationError extends Error {
  constructor(
    public readonly contentType: 'Sinal' | 'Análise',
    public readonly field: string,
    message: string,
  ) {
    super(`[${contentType}] ${field}: ${message}`);
    this.name = 'SchemaValidationError';
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((v) => typeof v === 'string');
}

function isISODate(val: unknown): boolean {
  if (!isString(val)) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val));
}

// ─── Sinal Schema ─────────────────────────────────────────────────────────────

const SINAL_REQUIRED = ['title', 'slug', 'date', 'description', 'tags'] as const;

export function validateSinalFrontmatter(
  raw: Record<string, unknown>,
): asserts raw is Record<string, unknown> & SinalFrontmatter {
  for (const field of SINAL_REQUIRED) {
    if (raw[field] === undefined || raw[field] === null) {
      throw new SchemaValidationError('Sinal', field, 'required field is missing');
    }
  }

  if (!isString(raw.title)) {
    throw new SchemaValidationError('Sinal', 'title', 'must be a non-empty string');
  }
  if (!isString(raw.slug)) {
    throw new SchemaValidationError('Sinal', 'slug', 'must be a non-empty string');
  }
  if (!isISODate(raw.date)) {
    throw new SchemaValidationError('Sinal', 'date', 'must be a valid ISO 8601 date (YYYY-MM-DD)');
  }
  if (!isString(raw.description)) {
    throw new SchemaValidationError('Sinal', 'description', 'must be a non-empty string');
  }
  if (!isStringArray(raw.tags)) {
    throw new SchemaValidationError('Sinal', 'tags', 'must be an array of non-empty strings');
  }
  if (raw.tags.length === 0) {
    throw new SchemaValidationError('Sinal', 'tags', 'must have at least one tag');
  }

  // Optional fields — validate type if present
  if (raw.source !== undefined && !isString(raw.source)) {
    throw new SchemaValidationError('Sinal', 'source', 'if present, must be a string');
  }
  if (raw.url !== undefined && !isString(raw.url)) {
    throw new SchemaValidationError('Sinal', 'url', 'if present, must be a string');
  }
  if (
    raw.urgency !== undefined &&
    !['low', 'medium', 'high'].includes(raw.urgency as string)
  ) {
    throw new SchemaValidationError(
      'Sinal',
      'urgency',
      'if present, must be one of: low, medium, high',
    );
  }
}

// ─── Análise Schema ────────────────────────────────────────────────────────────

const ANALISE_REQUIRED = ['title', 'slug', 'date', 'description', 'thesis', 'sources'] as const;

export function validateAnaliseFrontmatter(
  raw: Record<string, unknown>,
): asserts raw is Record<string, unknown> & AnaliseFrontmatter {
  for (const field of ANALISE_REQUIRED) {
    if (raw[field] === undefined || raw[field] === null) {
      throw new SchemaValidationError('Análise', field, 'required field is missing');
    }
  }

  if (!isString(raw.title)) {
    throw new SchemaValidationError('Análise', 'title', 'must be a non-empty string');
  }
  if (!isString(raw.slug)) {
    throw new SchemaValidationError('Análise', 'slug', 'must be a non-empty string');
  }
  if (!isISODate(raw.date)) {
    throw new SchemaValidationError(
      'Análise',
      'date',
      'must be a valid ISO 8601 date (YYYY-MM-DD)',
    );
  }
  if (!isString(raw.description)) {
    throw new SchemaValidationError('Análise', 'description', 'must be a non-empty string');
  }
  if (!isString(raw.thesis)) {
    throw new SchemaValidationError('Análise', 'thesis', 'must be a non-empty string');
  }
  if (!isStringArray(raw.sources)) {
    throw new SchemaValidationError('Análise', 'sources', 'must be an array of non-empty strings');
  }
  if (raw.sources.length === 0) {
    throw new SchemaValidationError('Análise', 'sources', 'must have at least one source');
  }

  // Optional fields
  if (raw.relatedSinais !== undefined && !isStringArray(raw.relatedSinais)) {
    throw new SchemaValidationError(
      'Análise',
      'relatedSinais',
      'if present, must be an array of strings',
    );
  }
  if (raw.readTime !== undefined && typeof raw.readTime !== 'number') {
    throw new SchemaValidationError(
      'Análise',
      'readTime',
      'if present, must be a number (minutes)',
    );
  }
}
