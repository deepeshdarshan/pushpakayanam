import { query, where, orderBy, limit, limitToLast, startAfter, endBefore } from "firebase/firestore";

/**
 * Builds a Firestore query with optional filters.
 * 
 * @param {CollectionReference} colRef - Firestore collection reference.
 * @param {Object} options - Options for building the query.
 * @param {Array} [options.whereClauses] - Array of [field, operator, value] for filtering.
 * @param {string|object} [options.orderBy] - Field name (string) or { field, direction } object.
 * @param {number} [options.limit] - Number of documents to return.
 * @param {number} [options.limitToLast] - Number of documents from the end.
 * @param {DocumentSnapshot} [options.startAfter] - Start after a specific doc.
 * @param {DocumentSnapshot} [options.endBefore] - End before a specific doc.
 * 
 * @returns {Query} - The constructed Firestore query.
 */
export function buildQuery(colRef, options = {}) {
    const constraints = [];

    // WHERE clauses
    if (Array.isArray(options.whereClauses)) {
        for (const clause of options.whereClauses) {
            if (clause.length === 3) {
                constraints.push(where(clause[0], clause[1], clause[2]));
            }
        }
    }

    // ORDER BY
    if (options.orderBy) {
        if (typeof options.orderBy === 'string') {
            constraints.push(orderBy(options.orderBy));
        } else if (typeof options.orderBy === 'object' && options.orderBy.field) {
            constraints.push(orderBy(options.orderBy.field, options.orderBy.direction || 'asc'));
        }
    }

    // LIMIT / LIMIT TO LAST
    if (options.limitToLast) {
        constraints.push(limitToLast(options.limitToLast));
    } else if (options.limit) {
        constraints.push(limit(options.limit));
    }

    // PAGINATION CURSORS
    if (options.startAfter) {
        constraints.push(startAfter(options.startAfter));
    }

    if (options.endBefore) {
        constraints.push(endBefore(options.endBefore));
    }

    return query(colRef, ...constraints);
}
