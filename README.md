# Code Studio
Code Studio is an open source live front end code editing app. It lets you write html, css and javascript and see the results live.
## About
Code Studio is a project that started as a learning exercise.
 The editor area is named the __Control-Room__, the preview area, __Live-Room__ and code sessions go by the name __Track__ sticking with the recording studio theme, hence the name __Code Studio__.
## Install

## API Calls
### `GET`
- `/`
   - Looks for track id in query,if found, renders with track, else, renders empty, else, creates new id.
- `/new`
    - Creates new uniqid for new track and redirects to `/?is=` new id
- `/save-current-track`
    - Initial save from __Login to Save__, saves the code and title with the users githubId to DB.
    - This is the only call that pulls the track id from req.body.id vs req.query.id. 
### `POST`
- `/update-track`
    - Update track. Simalar to `/save-current-track` but the track id comes from query.
- `/update-title`
    - For title change, save only the title
- `/track-data`
    - To use in place of rending page with this data
