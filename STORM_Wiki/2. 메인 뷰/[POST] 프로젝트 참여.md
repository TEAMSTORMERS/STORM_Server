## [POST] 프로젝트 참여

<br>
<br>

![enterProject](https://user-images.githubusercontent.com/55133871/90500902-7c918400-e186-11ea-9592-374b4a4667c3.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  POST  | /project/enter | 해당 프로젝트에 참여하기 |



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
  "user_idx": INT,
  "project_idx": INT
}
```
* 데이터 타입을 적어두었습니다. 상황에 따라 맞는 값을 보내주시면 됩니다.
* user_idx : 사용자 인덱스
* project_idx : 프로젝트 인덱스

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "프로젝트 참여 성공",
    "data": 1
}
```
* data : round_idx


**ㅤ**

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