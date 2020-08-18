var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
app.io = require('socket.io')();

app.io.on('connection',(socket) => {

  console.log(socket.id + "가 들어왔다.");

  //새로운 참여자가 프로젝트에 참여했을 경우
  socket.on('joinRoom', roomCode => {
    socket.join(roomCode, () => {
      app.io.to(roomCode).emit('roundComplete', '참여자 목록 리로드');
    });
  });
  
  //호스트가 라운드 시작 버튼을 눌렀을 경우
  socket.on('roundStartHost', (roomCode) => {
    app.io.to(roomCode).emit('roundStartMember', '라운드 시작');
  });

  //호스트가 다음 라운드 진행 버튼을 눌렀을 경우
  socket.on('prepareNextRound', (roomCode) => {
    app.io.to(roomCode).emit('waitNextRound', '다음 라운드 설정 중');
  });
  
  //호스트가 다음 라운드 설정을 완료했을 경우
  socket.on('nextRound', (roomCode) => {
    app.io.to(roomCode).emit('memberNextRound', '다음 라운드 설정 완료');
  });

  //호스트가 프로젝트 종료 버튼을 눌렀을 경우
  socket.on('finishProject', (roomCode) => {
    app.io.to(roomCode).emit('memberFinishProject', roomCode);
  });

  //라운드 시작 전 프로젝트를 나갔을 경우
  socket.on('leaveRoom', (roomCode) => {
    socket.leave(roomCode, () => {
      app.io.to(roomCode).emit('roundComplete');
    });
  });

  socket.on('disconnect', () => {
    console.log(socket.id + '나감.');
  });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;