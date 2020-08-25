## [PUT] 프로젝트 상태 변경

<br>
<br>

![setProjectStatus](https://user-images.githubusercontent.com/55133871/90436660-0f410d00-e10c-11ea-9c1e-8e0797794565.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| PUT    | /project/status/:project_idx | 1라운드가 시작되면 더 이상 새로운 참여자가 프로젝트에 참여할 수 없도록 한다.|

<br>
<br>


### Request Query

| key       | 설명             | 타입 | 비고     |
| --------- | ---------------- | ---- | -------- |
| :project_idx | 해당 프로젝트의 idx 값 | INT  | NOT NULL |

<br>
<br>


### Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "프로젝트 상태 변경 성공"
}
```

<br>


<b> < Fail >


1. 데이터 누락

```javascript
{
  "status": 400,
  "success": false,
  "message": "필요한 값이 없습니다."
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