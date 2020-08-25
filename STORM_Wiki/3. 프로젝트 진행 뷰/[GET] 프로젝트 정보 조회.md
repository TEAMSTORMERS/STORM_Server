## [GET] 프로젝트 정보 조회

<br>
<br>

![프로젝트정보](https://user-images.githubusercontent.com/55133871/87724466-7e1e0400-c7f6-11ea-8742-99a1e3a2fc54.png)
> project_name과 같은 프로젝트 관련 정보가 필요한 곳에 모두 사용됩니다.

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
|  GET  | /project/:project_idx | 프로젝트 대기 화면에서 프로젝트 정보 보여주기 |

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

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :project_idx | 해당 프로젝트 인덱스 | INT  | NOT NULL |

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
        "project_name": "프로젝트1",
        "project_comment": "한 마디는 비워둘 수 있습니다.",
        "project_code": "4D3N7W"
    }
}
```
- project_name : 프로젝트 이름
- project_comment : 호스트 한 마디
- project_code: 프로젝트 참여 코드

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

