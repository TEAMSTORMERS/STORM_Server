## [POST] 라운드 참여(2라운드 이상 진행 시)

<br>
<br>

![nextRound](https://user-images.githubusercontent.com/55133871/90428975-c8e5b100-e0ff-11ea-8e3c-e1dae963c722.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
|  POST  | round/enter | (2라운드 이상 진행 시) 다음 라운드 참여자 목록에 추가 |

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
  "user_idx": INT,
  "project_idx": INT
}
```
- 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
- user_idx : 사용자 인덱스
- project_idx : 라운드 인덱스

<br>
<br>

### Response

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "라운드 참여자 목록 추가 성공",
    "data": 360
}
```
- data : 라운드 인덱스

<br>


<b>< Fail >

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

