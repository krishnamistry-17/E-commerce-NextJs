export interface Database {
  // your table definitions etc
  public: {
    Tables: {
      users: {
        Row: { id: string; name: string };
        Insert: { name: string };
        Update: { name?: string };
      };
      // ... other tables
    };
    // etc
  }
}
