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
<br><br>개발 기간 : 2020-06-30~2020-07-18 <br>
[📄API 명세서](https://github.com/TEAMSTORMERS/STORM_Server/wiki)<br>

<br>

## ⚡️About STORM
![브랜딩](https://user-images.githubusercontent.com/55133871/87826675-42e20a80-c8b4-11ea-9532-7826df649ea0.png)

<br>

## ⚡️Work Flow

![flow2](https://user-images.githubusercontent.com/55133871/87826346-b1729880-c8b3-11ea-9411-f22c37e86829.png)

<br>

## ⚡️Main Function
#### 1. 프로젝트 추가 및 참여하기
> 사용자는 새로운 프로젝트를 만들거나, 참여코드를 입력하여 기존 프로젝트에 참여할 수 있습니다.
새로운 프로젝트를 만들 경우 해당 유저의 정보가 프로젝트 및 ROUND 1의 참여자 목록과 프로젝트 호스트 목록에 등록되며,
기존 프로젝트에 참여할 경우 해당 유저의 정보는 프로젝트 및 ROUND 1의 참여자 목록에만 등록됩니다.
이후 호스트는 자유롭게 라운드를 추가하여 프로젝트를 계속 진행할 수 있습니다.

#### 2. 실시간으로 참여자 목록 갱신하기
> 소켓을 활용하여 새로운 참여자가 프로젝트에 들어오거나, 기존 참여자가 프로젝트에서 나갔을 때 참여자 목록을 실시간으로 갱신하여 업데이트합니다.
사용자가 목록 갱신 여부를 쉽게 알아볼 수 있도록 하기 위해 참여자 정보를 최신 입장순으로 제공하여 목록 최상단에서 변화가 나타납니다.

#### 3. 참여한 프로젝트 및 스크랩한 카드 모아보기
> 사용자는 본인이 참여했던 프로젝트와 스크랩했던 카드를 메인화면에서 모두 모아볼 수 있습니다.

#### 4.이미지 리사이징
> AWS Lambda 함수를 활용하여 AWS S3 버킷에 이미지가 저장될 경우 해당 이미지를 resizing해 저장합니다.

<br>
<br>

## ⚡️Functional Specification
[📄기능명세서](https://docs.google.com/spreadsheets/d/1a4JL1O6FLVjjnCx7rg4781ici10yg-ZGDMqT5empflk/edit#gid=686412120)

<br>
<br>

## ⚡️ER Diagram
![erd](https://user-images.githubusercontent.com/55133871/87429972-81ab6280-c61f-11ea-9679-d6ed564b2dbd.png)

<br>
<br>

## ⚡️Server Architecture
![architecture](https://user-images.githubusercontent.com/55133871/87429967-807a3580-c61f-11ea-8a58-8c821fe5fb17.png)

<br>

## ⚡️Dependencies Module
```
"dependencies": {
    "async": "^3.2.0",
    "aws-sdk": "^2.713.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "gm": "^1.23.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "promise-mysql": "^4.1.3",
    "socket.io": "^2.3.0",
    "util": "^0.12.3"
}
```

<br>
<br>

## ⚡️Developers
* [장세영](https://github.com/Say-young) <br>
* [조충범](https://github.com/cndqjacndqja)<br>

<br>
<br>

## ⚡️Team Role
* [칸반보드](https://github.com/TEAMSTORMERS/STORM_Server/projects/1)
> Git issues를 활용해 칸반보드를 작성했습니다.

<br>

## ⚡️Client
* [Android](https://github.com/TEAMSTORMERS/STORM_Android) <br>
* [iOS](https://github.com/TEAMSTORMERS/STORM_iOS)
