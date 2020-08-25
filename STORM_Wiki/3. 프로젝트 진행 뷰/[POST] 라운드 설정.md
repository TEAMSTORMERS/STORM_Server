## [POST] 라운드 설정

<br>
<br>

![라운드설정](https://user-images.githubusercontent.com/55133871/87725576-82e3b780-c7f8-11ea-9468-ee69c48a7ef9.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
|  POST  | round/setting | 라운드 목표, 소요 시간 설정하기 |


<br>
<br>

### Request Header

```
{
 "Content-Type": "application/json"
}
```

<br>
<br>

### Request Body

```
{
    "user_idx" : INT,
    "project_idx" : INT,
    "round_purpose" : STRING,
    "round_time" : INT
}
```
- user_idx : 호스트의 user_idx
- project_idx : 프로젝트 인덱스
- round_purpose : 라운드 목표
- round_time : 라운드 소요 시간

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "라운드 설정 성공"
    "data" : 81
}
```
- data: 생성한 라운드 인덱스 값

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

