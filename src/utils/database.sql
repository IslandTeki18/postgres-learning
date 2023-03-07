CREATE TABLE tag (
    tag_id BIGINT PRIMARY KEY,
    label VARCHAR(100),
    tag_color VARCHAR(100)
);


ALTER TABLE todo
ADD COLUMN assigned_to VARCHAR(100),
ADD COLUMN due_date DATE,
ADD COLUMN is_complete BOOLEAN,
ADD COLUMN is_important BOOLEAN,
ADD COLUMN title VARCHAR(100);
ADD COLUMN tag_id integer[] REFERENCES tag(tag_id);