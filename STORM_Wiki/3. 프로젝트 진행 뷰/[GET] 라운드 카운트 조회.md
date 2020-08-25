## [GET] 라운드 카운트 조회

<br>
<br>

![라운드카운트](https://user-images.githubusercontent.com/55133871/87725435-47e18400-c7f8-11ea-8ca8-4d8eab91d1be.png)

<br>
<br>

| Method | URL             | 기능                |
| :----: | :--------------: | :--: |
|  GET   | /round/count/:project_idx | 라운드 설정 화면에서 몇 라운드인지 라운드 수 정보 받아오기 |


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
    "message": "라운드 카운트 정보 출력 성공",
    "data": 1
}
```

* data : 현재 몇 라운드인지를 나타내는 수

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

2. 서버 에러

```javascript
{
  "status": 500,
  "success": false,
  "message": "서버 에러"
}
```