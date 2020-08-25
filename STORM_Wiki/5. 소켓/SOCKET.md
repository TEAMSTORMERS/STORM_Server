### 1. 프로젝트 및 라운드 참여
> 멤버가 프로젝트 및 라운드에 참여했을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(해당참여자)|socket.emit("joinRoom", "랜덤 프로젝트 코드")를 보낸다.|
|2|Client(방의 다른 참여자)|socket.on("roundComplete")로 신호를 받고 라운드 참여자 목록을 리로드한다.|

## </br>

### 2. 라운드 나가기
> 멤버가 대기방(라운드 준비 완료)에 있다가 라운드 시작 전에 방을 나갔을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(해당참여자)|socket.emit("leaveRoom", "랜덤 프로젝트 코드")를 보낸다.|
|2|Client(방의 다른 참여자)|socket.on("roundComplete")로 신호를 받고 라운드 참여자 목록을 리로드한다.|

## </br>

### 3. 라운드 시작
> 호스트가 라운드 시작 버튼을 눌렀을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(Host)|socket.emit("roundStartHost", "랜덤 프로젝트 코드")을 서버에 보낸다.|
|2|Client(Member)|socket.on("roundStartMember")로 신호를 받고 라운드를 시작한다.|

## </br>

### 4. (라운드 종료 후) 다음 라운드 준비
> 호스트가 다음 라운드 진행 버튼을 눌렀을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(Host)|socket.emit("prepareNextRound", "랜덤 프로젝트 코드")를 서버에 보낸다.|
|2|Client(Member)|socket.on("waitNextRound")로 신호를 받아 호스트가 다음 라운드를 세팅중이라는 안내문구를 띄운다.|

## </br>

### 5. (라운드 종료 후) 다음 라운드 시작
> 호스트가 다음 라운드 세팅 확인 버튼을 눌렀을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(Host)|socket.emit("nextRound", "랜덤 프로젝트 코드")를 서버에 보낸다.|
|2|Client(Member)|socket.on("memberNextRound")로 신호를 받아 다음 라운드 페이지로 넘어간다.|

## </br>

### 6. 다음 라운드에 입장할 경우
> 호스트가 다음 라운드 세팅 확인 버튼을 눌렀을 경우 / 멤버가 팝업에서 확인 버튼을 눌러 다음 단계에 참여할 때

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(Member)|socket.emit("enterNextRound", "랜덤 프로젝트 코드")를 서버에 보낸다.|
|2|Client(방의 다른 참여자)|socket.on("roundComplete")로 신호를 받고 라운드 참여자 목록을 리로드한다.|

## </br>

### 7. (라운드 종료 후) 프로젝트 종료
> 호스트가 프로젝트 종료 버튼을 눌렀을 경우

| 순서 | 누가 | 무엇을 |
|:---:|:----:|-------|
|1|Client(Host)|socket.emit("finishProject", "랜덤 프로젝트 코드")를 서버에 보낸다.|
|2|Client(Member)|socket.on("memberFinishProject")를 신호로 받아 프로젝트를 종료한다.|