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
Album
Artist
year
image
genre
Duration
name
key
mode
time_signature
tempo
acousticness
danceability
energy
instrumentalness
liveness
loudness
speechiness
valence
original
spotify_url
spotify_id

relationships:
belongs to user
has many instruments (through elements?)
has many elements

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
