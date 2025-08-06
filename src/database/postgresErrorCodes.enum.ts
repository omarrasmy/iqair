export enum PostgresErrorCode {
  UniqueViolation = '23505',
  InvalidForeignKey = '22P02',
  NotNullViolation = '23502',
  CheckViolation = '23514',
  ExclusionViolation = '23P01',
  InvalidTextRepresentation = '22P02',
  ForeignKeyViolation = '23503',
}
export enum MysqlErrorCode {
  DuplicateEntry = 'ER_DUP_ENTRY',             // 1062: Duplicate entry for key (unique violation)
  CannotAddForeignKeyConstraint = 'ER_CANNOT_ADD_FOREIGN', // 1215: Cannot add foreign key constraint
  RowIsReferenced = 'ER_ROW_IS_REFERENCED',     // 1451: Cannot delete or update a parent row (foreign key constraint fails)
  NoReferencedRow = 'ER_NO_REFERENCED_ROW',     // 1452: Cannot add or update a child row: a foreign key constraint fails
  BadNullError = 'ER_BAD_NULL_ERROR',           // 1048: Column cannot be null (NOT NULL constraint)
  DataTooLong = 'ER_DATA_TOO_LONG',             // 1406: Data too long for column
  TruncatedWrongValue = 'ER_TRUNCATED_WRONG_VALUE', // 1366: Incorrect value (invalid text representation)
  CheckConstraintViolation = 'ER_CHECK_CONSTRAINT_VIOLATED', // MySQL 8.0+ only
}