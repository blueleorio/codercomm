# CoderComm Frontend

A demo application for teaching the FTW course at CoderSchool.

## Get Started

- Register for a [Cloudinary](https://cloudinary.com/) account. And create a **unsigned** upload preset: https://cloudinary.com/documentation/upload_presets

- Create `/.env`:

```
REACT_APP_BACKEND_API="https://codercomm-api-dot-cs-platform-306304.et.r.appspot.com/api"
REACT_APP_CLOUDINARY_CLOUD_NAME = 'cloudinary-cloud-name'
REACT_APP_CLOUDINARY_UPLOAD_PRESET = 'cloudinary-upload-preset'
```

The upload preset of your cloudinary should be **unsigned**.

- Run `npm install`

The demo app is running on: https://codercomm-dot-cs-platform-306304.et.r.appspot.com

### Based on the CoderComm app of the case study, let's add a few more features to it:

1. User can delete a Post that he/she is the author.

- API: **DELETE** /api/posts/:id

2. User can edit his/her Posts.

- API: **PUT** /api/posts/:id

3. User can delete the Comment that he/she wrote.

- API: **DELETE** /api/comments/:id

4. After User decides to delete a Post/Comment, a window will pop up asking for confirmation.

5. User can see a list of requests that he/she has sent.
   On the list, User can cancel the requests.

- API: **GET** /api/friends/requests/outgoing
