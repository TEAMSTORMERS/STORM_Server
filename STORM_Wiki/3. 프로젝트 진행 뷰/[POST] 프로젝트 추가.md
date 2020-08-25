## [POST] 프로젝트 추가

<br>
<br>

![프로젝트추가](https://user-images.githubusercontent.com/55133871/87723841-5a0df300-c7f5-11ea-8013-0c01644aaa67.png)

<br>
<br>

| Method |  URL   | 기능 |
| :----: | :-----: | :--: |
|  POST  | /project | HOST가 새로운 프로젝트를 추가하기 |



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

```javascript
{
  "project_name": STRING,
  "project_comment": STRING,
  "user_idx" : INT
}
```

* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* project_name : 프로젝트 명
* project_comment : 호스트 한 마디
* user_idx : 사용자 인덱스


<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "프로젝트 생성 성공",
    "data": {
        "project_code": "4D3N7W",
        "project_idx": 1
    }
}
```
- project_code: 프로젝트 참여 코드
- project_idx: 프로젝트 인덱스

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

