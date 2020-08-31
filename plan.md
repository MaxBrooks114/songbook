Models:

User:
attr:
Name
username
password
email

    ## relationships:
        has many songs
        has many instruments
        has many elements

Instrument:
attr:
Make
Model
Year
Name
family
range
name

## relationships:

belongs to user
has many songs
has many elements

Song:
attr:

Element:
Attr:
start
duration
loudness
tempo
key
mode
learned
time_signature

relationships
belongs to a user
belongs to a song

users can:

    add an instrument
    add a song:
        manually or through spotify
        import a spotify playlist(later)
    add elements to the song:
        Through spotify or man
