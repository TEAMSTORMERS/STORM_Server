## [GET] 라운드 카드 리스트 조회

<br>
<br>


![라운드카드리스트](https://user-images.githubusercontent.com/55133871/87725961-2cc34400-c7f9-11ea-94e0-036e682aab5a.png)

<br>
<br>


| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| GET    | round/cardList/:project_idx/:round_idx/:user_idx | 해당 라운드에서 생성된 모든 카드 리스트를 받아온다. |


<br>
<br>



### Request Query

| key          | 설명            | 타입 | 비고     |
| ------------ | --------------- | ---- | -------- |
| :project_idx | 프로젝트 인덱스 | INT  | NOT NULL |
| :round_idx   | 라운드 인덱스   | INT  | NOT NULL |
| :user_idx   | 유저 인덱스   | INT  | NOT NULL |


<br>
<br>


## Response



<b> < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "라운드 카드 정보 출력 성공",
    "data": {
        "project_name": "테스트 프로젝트",
        "round_number": 1,
        "round_purpose": "api 수정",
        "round_time": 10,
        "card_list": [
            {
                "card_idx": 1,
                "scrap_flag": 1,
                "card_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/159705173.png",
                "card_txt": null,
                "user_idx": 1,
                "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/15965583.jpg",
                "memo_content": "메모 내용 쏼라"
            },
            {
                "card_idx": 2,
                "scrap_flag": 0,
                "card_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/15976541.png",
                "card_txt": null,
                "user_idx": 1,
                "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/1596445583.jpg",
                "memo_content": ""
            }
        ]
    }
}
```
- project_name: 프로젝트 이름
- round_number: 해당 라운드가 몇 라운드인지
- round_purpose: 라운드 목표
- round_time: 라운드 소요 시간
- card_list: 라운드 카드 리스트
- card_idx: 카드 인덱스
- scrap_flag : 해당 카드를 스크랩한 여부 (스크랩함 1 / 스크랩안함 0)
- card_img: 카드 이미지
- card_txt: 카드 텍스트
- user_idx : 카드를 생성한 유저의 인덱스
- user_img: 카드를 생성한 유저의 이미지
- memo_content : 카드에 메모한 내용

<br>ㅤ

<b> < Fail >


1. 데이터 누락 

```json
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