from sqlalchemy.engine import create_engine

engine = create_engine('mysql://root:123456@192.168.3.10/rss')
connection = engine.connect()
print connection
print "come to here"
connection.execute(
    """
    CREATE TABLE users(
        username VARCHAR PRIMARY KEY,
        password VARCHAR NOT NULL,
    );
    """
)
connection.execute(
    """
    INSERT INTO users (username, password) VALUES (?, ?);
    """,
    "foo", "bar"
)

result = connection.execute("SELECT username FROM users")
for row in result:
    print "username", row['username']
connection.close()
