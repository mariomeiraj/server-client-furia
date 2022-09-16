const { createClient } = require('@supabase/supabase-js');

module.exports = createClient(process.env.STORAGE_URL, process.env.STORAGE_KEY);
