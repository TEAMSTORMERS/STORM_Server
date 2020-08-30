# ⚡️🌪STORM SERVER🌪⚡️

<img src = "https://user-images.githubusercontent.com/55133871/87793056-b0277880-c87f-11ea-9f5a-62bcb3054a31.gif" width = "100%">

<img src = "https://user-images.githubusercontent.com/55133871/87793832-c41faa00-c880-11ea-96c9-4b85d248149e.png" width = "20%">

![npm_bedge](https://img.shields.io/badge/STORM-STORMERS-EC6565)
![node_badge](https://img.shields.io/badge/node-%3E%3D%2012.0.0-F5CA6E)
![npm_bedge](https://img.shields.io/badge/npm-v6.12.0-866DC9)

<br>

<b>실시간 브레인스토밍 협업 플랫폼 - STORM</b>
> STORM은 효율적인 아이디어 회의를 돕는 온라인 툴이자 브레인스토밍을 함께하는 서비스입니다.
<br> 라운드마다 목표와 제한 시간을 설정해 각자 아이디어를 고민해보고,
<br> 각 라운드 후에는 팀원들이 함께 의견을 나눌 수 있습니다.
<br> 프로젝트가 끝난 뒤에는 최종 정리를 통해 라운드 및 카드 목록을 한눈에 볼 수 있으며,
<br> 좋은 아이디어 카드들은 따로 스크랩해 모아볼 수 있습니다.
<br><br>Release v1.1.0 개발 기간 : ~2020-08-30 <br>
[📄API 명세서](https://github.com/TEAMSTORMERS/STORM_Server/tree/addWiki)<br>

<br>

## ⚡️About STORM
![브랜딩](https://user-images.githubusercontent.com/55133871/87826675-42e20a80-c8b4-11ea-9532-7826df649ea0.png)

<br>

## ⚡️Work Flow

![flow2](https://user-images.githubusercontent.com/55133871/87826346-b1729880-c8b3-11ea-9411-f22c37e86829.png)

<br>

## ⚡️Main Function
#### 1. 프로젝트 진행하기
> 사용자는 새로운 프로젝트를 만들거나, 참여코드를 입력하여 기존 프로젝트에 참여할 수 있습니다.
각 라운드에서는 미리 설정한 목표 시간 안에 원하는 만큼 브레인스토밍 카드를 생성할 수 있습니다.
라운드 종료 후에는 해당 라운드에 생성된 모든 카드를 확인할 수 있으며, 스크랩 및 메모 작성이 가능합니다.
라운드 종료 후 호스트는 자유롭게 라운드를 추가하여 프로젝트를 계속 진행할 수 있습니다.

#### 2. 실시간으로 참여자 목록 갱신하기
> 소켓을 활용하여 새로운 참여자가 프로젝트에 들어오거나, 기존 참여자가 프로젝트에서 나갔을 때 참여자 목록을 실시간으로 갱신하여 업데이트합니다.

#### 3. 참여한 프로젝트 및 스크랩한 카드 모아보기
> 사용자는 본인이 참여했던 프로젝트와 스크랩했던 카드를 메인화면에서 모두 모아볼 수 있습니다.

<br>
<br>

## ⚡️ER Diagram
![erd_release_1 1 0](https://user-images.githubusercontent.com/55133871/91662214-f37e3380-eb1b-11ea-9899-6999e0209ab5.PNG)

<br>
<br>

## ⚡️Server Architecture
![architecture](https://user-images.githubusercontent.com/55133871/87429967-807a3580-c61f-11ea-8a58-8c821fe5fb17.png)

<br>

## ⚡️Dependencies Module
```
  "dependencies": {
    "aws-sdk": "^2.735.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "nodemon": "^2.0.4",
    "pbkdf2": "^3.1.1",
    "promise-mysql": "^4.1.3",
    "rand-token": "^1.0.1",
    "socket.io": "^2.3.0"
  }
```

<br>
<br>

## ⚡️Code Convention
* git branch
  * git flow를 적용합니다. 각 기능별로 feat/{기능 이름}을 생성해 작업한 후 dev에 merge합니다.

* git comment message rule
  * [feat] 기능 추가 <br>
  * [refactor] 기능 수정 <br>
  * [fix] 버그 수정

* git merge rule
  * pull request를 날릴 경우 자신이 작업한 내용을 자세하게 comment로 남깁니다. 이후 상대방이 해당 내용을 확인하고 merge를 승인합니다. 이 때, 코드 리뷰가 필요할 경우 comment를 남길 수 있습니다.

<br>
<br>

## ⚡️Developers
* [장세영](https://github.com/Say-young) <br>
* [조충범](https://github.com/cndqjacndqja)<br>

<br>
<br>

## ⚡️Client
* [Android](https://github.com/TEAMSTORMERS/STORM_Android) <br>
* [iOS](https://github.com/TEAMSTORMERS/STORM_iOS)
