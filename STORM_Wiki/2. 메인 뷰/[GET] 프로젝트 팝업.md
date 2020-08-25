## [GET] 프로젝트 팝업

<br>
<br>

![popup](https://user-images.githubusercontent.com/55133871/90500387-c29a1800-e185-11ea-8df7-dc46774a825c.png)

<br>
<br>

| Method |  URL   |                    기능                     |
| :----: | :-----: | :-----------------------------------------: |
|  GET  | /project/info/:project_code | 해당 프로젝트의 정보를 담은 팝업 띄우기 |



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




### Request Query

| key       | 설명             | 타입 | 비고     |
| --------- | ---------------- | ---- | -------- |
| :project_code | 프로젝트 참여 코드 | STRING  | NOT NULL |

<br>
<br>

### Response

<br>

<b>< Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "프로젝트 정보 출력 성공",
    "data": {
        "project_idx": 1,
        "project_name": "프로젝트 이름",
        "project_comment": "프로젝트 한 마디"
    }
}
```
- project_idx: 프로젝트 인덱스
- project_name : 프로젝트 이름
- project_comment : 프로젝트 한 마디

**ㅤ**

<br>

<b> < Fail >

1. 프로젝트가 진행중인 경우

```javascript
{
  "status": 202,
  "success": false,
  "message": "이미 프로젝트가 진행중입니다."
}
```

2. 1라운드 세팅이 안 된 경우

```javascript
{
  "status": 204,
  "success": false,
  "message": "지금은 호스트가 준비 중입니다."
}
```

3. 데이터 누락

```javascript
{
  "status": 400,
  "success": false,
  "message": "필요한 값이 없습니다."
}
```

4. 잘못된 프로젝트 코드 입력

```javascript
{
  "status": 400,
  "success": false,
  "message": "유효하지 않은 코드입니다."
}
```

5. DB 오류

```javascript
{
  "status": 600,
  "success": false,
  "message": "DB 오류"
}
```

6. 서버 에러

```javascript
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```