## [GET] 스크랩한 카드 조회

<br>
<br>

![scrapView](https://user-images.githubusercontent.com/55133871/90430287-25e26680-e102-11ea-8df8-f6ea146a9eb4.png)


<br>
<br>


| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| GET    | /project/finalScarpList/:user_idx/:project_idx | 해당 프로젝트에서 스크랩한 모든 카드 리스트 출력 |



<br>
<br>


### Request Query

| key          | 설명            | 타입 | 비고     |
| ------------ | --------------- | ---- | -------- |
| :user_idx    | 유저 인덱스     | INT  | NOT NULL |
| :project_idx | 프로젝트 인덱스 | INT  | NOT NULL |


<br>
<br>


### Response


<b> < Success > </b>

```json
{
    "status": 200,
    "success": true,
    "message": "최종 정리 뷰 라운드 별 모든 정보 받아오기 성공.",
    "data": {
        "project_name": "1",
        "scrap_count": 2,
        "card_item": [
            {
                "round_number": 1,
                "round_purpose": "1",
                "round_time": 1,
                "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/15979515585.JPEG",
                "card_idx": 1,
                "card_img": "1",
                "card_txt": "1",
                "memo_content": "1"
            },
            {
                "round_number": 2,
                "round_purpose": "2라운드",
                "round_time": 10,
                "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/15982848830.JPEG",
                "card_idx": 472,
                "card_img": null,
                "card_txt": "?",
                "memo_content": null
            }
        ]
    }
}
```
+ project_name: 프로젝트 제목
+ scrap_count: 해당 프로젝트에서 스크랩한 카드 수
+ card_item: 스크랩한 카드 리스트
+ round_number : 해당 카드가 생성된 라운드가 몇 라운드인지
+ round_purpose : 해당 카드가 생성된 라운드의 목표
+ round_time : 해당 라운드의 소요 시간
+ user_img: 카드 생성자의 프로필 이미지
+ card_idx: 카드 인덱스
+ card_img: 카드 이미지
+ card_txt: 카드 텍스트
+ memo_content: 사용자가 카드에 작성한 메모 내용

<br>

<b> < Fail > <b>


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
