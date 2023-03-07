CREATE TABLE tag (
    tag_id BIGINT PRIMARY KEY,
    label VARCHAR(100),
    tag_color VARCHAR(100)
);

INSERT INTO tag(tag_id, label, tag_color) VALUES
(1, 'Small', '#4cff33'),
(2, 'Medium', '#f9ff33'),
(3, 'Large', '#ffb233'),
(4, 'X-Large', '#f33835')
RETURNING *;


ALTER TABLE todo
ADD COLUMN tag_id BIGINT[];