import { useEffect, useState } from 'react';
import p01 from './assets/고윤정.jpg';
import p02 from './assets/김태희.jpg';
import p03 from './assets/김혜수.jpg';
import p04 from './assets/김희선.jpg';
import p05 from './assets/문채원.jpg';
import p06 from './assets/배수지.jpg';
import p07 from './assets/손예진.jpg';
import p08 from './assets/송혜교.jpg';
import p09 from './assets/신민아.jpg';
import p10 from './assets/신세경.jpg';
import p11 from './assets/이영애.jpg';
import p12 from './assets/이주빈.jpg';
import p13 from './assets/전지현.jpg';
import p14 from './assets/하지원.jpg';
import p15 from './assets/한가인.jpg';
import p16 from './assets/한지민.jpg';

function Worldcup() {
    const candidate = [
        { name: '고윤정', src: p01 },
        { name: '김태희', src: p02 },
        { name: '김혜수', src: p03 },
        { name: '김희선', src: p04 },
        { name: '문채원', src: p05 },
        { name: '배수지', src: p06 },
        { name: '손예진', src: p07 },
        { name: '송혜교', src: p08 },
        { name: '신민아', src: p09 },
        { name: '신세경', src: p10 },
        { name: '이영애', src: p11 },
        { name: '이주빈', src: p12 },
        { name: '전지현', src: p13 },
        { name: '하지원', src: p14 },
        { name: '한가인', src: p15 },
        { name: '한지민', src: p16 }
    ];

    const [game, setGame] = useState([]);
    const [round, setRound] = useState(0);
    const [nextGame, setNextGame] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [stat, setStat] = useState({
        "고윤정": 0,
        "김태희": 0,
        "김혜수": 0,
        "김희선": 0,
        "문채원": 0,
        "배수지": 0,
        "손예진": 0,
        "송혜교": 0,
        "신민아": 0,
        "신세경": 0,
        "이영애": 0,
        "이주빈": 0,
        "전지현": 0,
        "하지원": 0,
        "한가인": 0,
        "한지민": 0,
    });


    // 처음 Worldcup 컴포넌트가 단 한 번 실행하는 함수
    useEffect(() => {
        const 문자열 = localStorage.getItem("월드컵");
        if (문자열 != null) {
            setStat(JSON.parse(문자열));
        }

        setGame(candidate.map(c => {
            return { name: c.name, src: c.src, order: Math.random() }
        }).sort((l, r) => {
            return l.order - r.order;
        })
        );
    }, []);

    useEffect(() => {
        if (game.length > 1 && round + 1 > game.length / 2) {
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }

        // 이 부분에 else if로 우승을 리턴하면 안되는 이유?

    }, [round]);

    if (game.length == 1) {
        localStorage.setItem("월드컵", JSON.stringify(stat));
        return <div>
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} style={{ width: "70%" }} /> <p>{game[0].name}</p> <p>{ stat[ game[0].name ] }번 승리</p>
            <table>
                {Object.keys(stat).map(name => {
                    return <tr key={name}><td>{name}</td><td>{stat[name]}</td></tr>
                })}
            </table>
        </div>
    }

    if (game.length == 0 || round + 1 > game.length / 2) return <p>로딩중입니다.</p>;

    const left = round * 2, right = round * 2 + 1;

    const leftFunction = () => {
        console.log('left Function');
        setStat({
            ...stat,
            [game[left].name]: stat[game[left].name] + 1
        });
        // setStat((prevStat) => {
        //     console.log('front', prevStat);
        //     prevStat[game[left].name] = prevStat[game[left].name] + 1;
        //     console.log('back', prevStat);
        //     return prevStat;
        // });

        setSelectedImage(left);
        setTimeout(() => {
            setSelectedImage(null);
            setNextGame((prev) => prev.concat(game[left]));
            setRound((round) => round + 1);
            console.log(stat);      // 이전 꺼까지만 반영???
        }, 3000);
    };

    const rightFunction = () => {
        setStat({
            ...stat,
            [game[right].name]: stat[game[right].name] + 1
        });

        // setStat((prevStat) => {
        //     prevStat[game[right].name] = prevStat[game[right].name] + 1;
        //     return prevStat;
        // });

        setSelectedImage(right);
        setTimeout(() => {
            setSelectedImage(null);
            setNextGame((prev) => prev.concat(game[right]));
            setRound((round) => round + 1);
            console.log(stat);
        }, 3000);

    };

    return <div>
        <p style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>이상형 월드컵 {round + 1} / {game.length / 2}  <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ position: "relative", width: "50%", display: selectedImage === left || selectedImage === null ? "block" : "none" }}>
                <img
                    src={game[left].src}
                    onClick={leftFunction}
                    style={{ width: "100%", height: "100%" }}
                />
                <div style={{ position: "absolute", bottom: "10%", left: "40%", textShadow: "2px 2px 2px black", fontSize: "300%" }}>
                    {game[left].name}
                </div>
            </div>

            <div style={{ position: "relative", width: "50%", display: selectedImage === right || selectedImage === null ? "block" : "none" }}>
                <img
                    src={game[right].src}
                    onClick={rightFunction}
                    style={{ width: "100%", height: "100%" }}
                />
                <div style={{ position: "absolute", bottom: "10%", left: "40%", textShadow: "2px 2px 2px black", fontSize: "300%" }}>
                    {game[right].name}
                </div>
            </div>
        </div>
    </div>

        ;
}

export default Worldcup;