
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jvzmhnhfqiqfhirfnhqj.supabase.co"
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2em1obmhmcWlxZmhpcmZuaHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMDI4MzYsImV4cCI6MjAyNDg3ODgzNn0.2FBdtOF7svVVdfAagQ9MlN5dEz8BkAQKksOsknBo-30"

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabasekey)