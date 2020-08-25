## [PUT] 프로젝트 종료

<br>
<br>

![finish](https://user-images.githubusercontent.com/55133871/90517480-67295380-e1a0-11ea-8203-c44b054532c6.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| PUT    | /project/finish/:project_idx | 프로젝트 종료 시 DB에서 해당 프로젝트의 코드를 삭제한다. |

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
    "message": "프로젝트 종료. 프로젝트 코드 삭제 성공."
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