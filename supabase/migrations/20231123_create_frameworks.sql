-- Create frameworks table
CREATE TABLE IF NOT EXISTS frameworks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create controls table
CREATE TABLE IF NOT EXISTS controls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    framework_id UUID REFERENCES frameworks(id) ON DELETE CASCADE,
    parent_control_id UUID REFERENCES controls(id) ON DELETE CASCADE,
    control_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE controls ENABLE ROW LEVEL SECURITY;

-- Create policies for frameworks
CREATE POLICY "Enable read access for all users" ON frameworks
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON frameworks
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON frameworks
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create policies for controls
CREATE POLICY "Enable read access for all users" ON controls
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON controls
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON controls
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_frameworks_name ON frameworks(name);
CREATE INDEX IF NOT EXISTS idx_controls_framework_id ON controls(framework_id);
CREATE INDEX IF NOT EXISTS idx_controls_parent_id ON controls(parent_control_id);
CREATE INDEX IF NOT EXISTS idx_controls_control_id ON controls(control_id);
