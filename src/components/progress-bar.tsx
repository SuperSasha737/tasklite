import styled from "@emotion/styled";

const Wrapper = styled.div`
    padding: ${p => p.theme.spacing(2)} 0;
`;

const ProgressBG = styled.div`
    width: 100%;
    height: ${p => p.theme.spacing(1.25)};
    background: rgb(229, 229, 229);
    border-radius: 9999px;
    overflow: hidden;
`;

const ProgressLine = styled.div<{ percent: number }>`
    height: 100%;
    width: ${p => p.percent}%;
    background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
    transition: width 0.4s;
    border-radius: 9999px;
`;

const ProgressText = styled.p`
    text-align: center;
    padding: ${p => p.theme.spacing(1)};
`;

type ProgressBarProps = {
    percent: number;
};

export default function ProgressBar(props: ProgressBarProps) {
    return (
        <Wrapper>
            <ProgressBG>
                <ProgressLine percent={props.percent}></ProgressLine>
            </ProgressBG>
            <ProgressText>Завершено: {props.percent}%</ProgressText>
        </Wrapper>
    )
}