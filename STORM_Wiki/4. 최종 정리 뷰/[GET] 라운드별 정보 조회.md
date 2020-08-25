## [GET] 라운드 별 정보 조회

<br>
<br>

![라운드별](https://user-images.githubusercontent.com/55133871/87727204-7ad94700-c7fb-11ea-9094-20c0e2dbacc1.png)

<br>
<br>

| Method | URL             | 기능                |
| :------: | :-----------------------: | :------------------------------: | 
| GET    | round/roundFinalInfo/:user_idx/:project_idx | 해당 프로젝트의 라운드 정보들 출력 |

<br>
<br>

### Request Query

| key          | 설명                 | 타입 | 비고     |
| ------------ | -------------------- | ---- | -------- |
| :user_idx | 유저 인덱스 | INT  | NOT NULL |
| :project_idx | 해당 프로젝트 인덱스 | INT  | NOT NULL |

<br>
<br>

## Response

<br>

### < Success >

```json
{
    "status": 200,
    "success": true,
    "message": "최종 정리 뷰 라운드 별 모든 정보 받아오기 성공.",
    "data": [
        {
            "round_idx": 1,
            "round_number": 1,
            "round_purpose": "1라운드 목표",
            "round_time": 10,
            "round_participant": [
                {
                    "user_name": "test1",
                    "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/7854158652.png"
                },
                {
                    "user_name": "test2",
                    "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/487653425895.png"
                }
            ]
        },
        {
            "round_idx": 2,
            "round_number": 2,
            "round_purpose": "2라운드 목표",
            "round_time": 5,
            "round_participant": [
                {
                    "user_name": "test1",
                    "user_img": "https://sopt-26-server.s3.ap-northeast-2.amazonaws.com/images/7854158652.png"
                }
            ]
        }
    ]
}
```
+ round_idx: 라운드 인덱스
+ round_number: 라운드 넘버
+ round_purpose: 라운드 목표
+  round_time: 라운드 소요시간
+ round_participant: 라운드 참여 유저 리스트
+ user_name: 참여한 유저 이름
+ user_img: 참여한 유저 이미지

#### ㅤ

<br>
<br>

### < Fail >

<br>

1. 데이터 누락 

```json
{
    "status": 400,
    "success": false,
    "message": "최종 정리 뷰 라운드 별 모든 정보 받아오기 실패했습니다."
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