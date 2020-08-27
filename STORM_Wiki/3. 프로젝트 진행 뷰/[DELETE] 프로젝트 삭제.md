## [DELETE] 프로젝트 삭제

<br>
<br>

![leaveProject](https://user-images.githubusercontent.com/55133871/91463246-1ca58680-e8c6-11ea-9eb8-0e1803580b8c.png)

<br>
<br>

| Method |             URL          | 기능                                     |
| ------ | ------------------------ | ---------------------------------------- |
| DELETE | /project/leave/:project_idx | 1라운드 설정 화면에서 HOST가 나가기 버튼을 누를 경우 프로젝트 삭제 |

<br>
<br>


### Request Query

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :project_idx | 해당 프로젝트 인덱스 | INT  | NOT NULL |

<br>
<br>


### Response


<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "프로젝트 참여자 목록에서 삭제 완료"
}
```

<br>


<b> < Fail >


1. 데이터 누락

```json
{
    "status": 400,
    "success": false,
    "message": "필요한 값이 없습니다"
}
```

2. DB 오류

```javascript
{
  "status": 600,
  "success": false,
  "message": "DB 오류"
}
```

3. 서버 에러

```javascript
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```
