import React, {useState, useEffect, useContext} from 'react';
import {Container, Card, Button, Spinner} from 'react-bootstrap';
import {fetchQuiz} from "../http/quizAPI";
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton} from 'react-share';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {Context} from "../index";

const QuizPage = () => {
    const [quizData, setQuizData] = useState([]);
    const [score, setScore] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const {userStorage} = useContext(Context);

    useEffect(() => {
        fetchQuiz().then((data) => {
            setQuizData(data);
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (isSubmitting) return;

        if (!selectedAnswer) {
            alert("Please select an answer before submitting.");
            return;
        }

        const currentQuestion = quizData[currentIndex];
        if (selectedAnswer === currentQuestion.correctAnswer)
            setScore(score + 1);

        setIsSubmitting(true);


        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer('');
            setIsSubmitting(false);
        } else {
            setIsQuizComplete(true);
        }
    };


    if (quizData.length === 0) {
        return <Spinner animation="border"/>;
    }

    if (isQuizComplete || timeLeft < 0) {
        const quizResults = `I scored ${score} on the quiz!`;

        return (
            <Container style={{
                display: 'flex', flexDirection: "column",
                justifyContent: 'center', alignItems: 'center', height: '100vh'
            }}>
                <h1>Quiz Complete!</h1>
                <p style={{fontSize: "24px"}}><span style={{color: "#1877f2"}}>{userStorage.user.name}</span>, thank you for participating.</p>
                <h3>Score: {score}</h3>

                <div>
                    <FacebookShareButton url={window.location.href} quote={quizResults}>
                        <div className="share-button facebook">
                            <FontAwesomeIcon icon={faFacebook} size="2x"/>
                            <span className={'ms-2'}>Share on Facebook</span>
                        </div>
                    </FacebookShareButton>

                    <TwitterShareButton url={window.location.href} title={quizResults}>
                        <div className="share-button twitter">
                            <FontAwesomeIcon icon={faTwitter} size="2x"/>
                            <span className={'ms-2'}>Share on Twitter</span>
                        </div>
                    </TwitterShareButton>

                    <LinkedinShareButton url={window.location.href} title={quizResults}>
                        <div className="share-button linkedin">
                            <FontAwesomeIcon icon={faLinkedin} size="2x"/>
                            <span className={'ms-2'}>Share on LinkedIn</span>
                        </div>
                    </LinkedinShareButton>
                </div>
            </Container>
        );
    }

    if (timeLeft <= 0) {
        handleSubmit();
    }

    return (
        <Container>
            <h1>Book Quiz</h1>
            <Card>
                <Card.Body>
                    <p>Question {currentIndex + 1} of {quizData.length}</p>
                    <h3>{quizData[currentIndex].question}</h3>
                    {quizData[currentIndex].options.map(option => (
                        <Button
                            key={option}
                            variant={selectedAnswer === option ? 'primary' : 'outline-primary'}
                            onClick={() => handleAnswerSelect(option)}
                            className={"me-3"}
                        >
                            {option}
                        </Button>
                    ))}
                </Card.Body>
            </Card>
            <div className="mt-3">
                <p>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
                <Button onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
            </div>
        </Container>
    );
};

export default QuizPage;
