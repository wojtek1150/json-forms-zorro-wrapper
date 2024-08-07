export interface ValidationError {
  data: any;
  instancePath: string;
  keyword: string;
  message: string;
  params: Record<string, any>;
  parentSchema: Record<string, any>;
  schema: any;
  schemaPath: string;
}
