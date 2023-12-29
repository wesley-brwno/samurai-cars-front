import { HttpHeaders } from "@angular/common/http";

export interface ApiErrorResponse {
    error: {
      details: string;
      developer_message: string;
      fields: string;
      fields_message: string;
      status: string;
      timestamp: string;
      title: string;
    };
    headers: HttpHeaders;
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
  }
  