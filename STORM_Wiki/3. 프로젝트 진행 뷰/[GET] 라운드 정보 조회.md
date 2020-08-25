## [GET] 라운드 정보 조회

<br>
<br>

![라운드참여자목록](https://user-images.githubusercontent.com/55133871/87724608-b6bddd80-c7f6-11ea-89e6-40b12a4a79bd.png)

<br>
<br>

| Method |       URL       | 기능 |
| :----: | :--------------: | :--: |
|  GET   | round/info/:round_idx | HOST가 설정한 라운드 정보를 받아오기 |


<br>
<br>




### Request Query

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :round_idx | 해당 라운드 인덱스 | INT  | NOT NULL |


<br>
<br>


### Response

<b> < Success >

```javascript
{
    "status": 200,
    "success": true,
    "message": "라운드 정보 출력 성공",
    "data": {
        "round_number": 1,
        "round_purpose": "1라운드",
        "round_time": 10
    }
}
```
* round_number : 현재 몇 라운드인지
* round_purpose : 라운드 목표
* round_time : 라운드 소요 시간

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

