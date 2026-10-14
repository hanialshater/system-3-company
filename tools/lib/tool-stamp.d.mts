export interface ToolStamp {
  files: string[];
  head?: string;
  commit?: string | null;
  blobs?: Record<string, string>;
  modified?: string[];
  clean: boolean;
  root?: string;
  error?: string;
}
export function gitStamp(files: string[], opts?: { from?: string }): ToolStamp;
