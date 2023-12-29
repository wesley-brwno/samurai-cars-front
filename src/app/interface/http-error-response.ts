import { HttpHeaders } from "@angular/common/http";

interface ErrorResponse {
  headers: HttpHeaders;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}

export interface ApiErrorResponse extends ErrorResponse{
  error: {
    details: string;
    developer_message: string;
    fields: string;
    fields_message: string;
    status: string;
    timestamp: string;
    title: string;
  };
}

export interface ApiExceptionResponse extends ErrorResponse {
  error: {
    details: string;
    developer_message: string;
    status: string;
    timestamp: string;
    title: string;
  };
}
