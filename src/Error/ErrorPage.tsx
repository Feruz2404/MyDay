import SidebarLayout from "../layouts/SidebarLayout";
import styled from "styled-components";

const ErrorPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
`;

const ErrorTitle = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: #334D6E;
    margin-bottom: 16px;
`;

const ErrorDescription = styled.p`
    font-size: 18px;
    color: #78909C;
    text-align: center;
    max-width: 400px;
`;

const ErrorButton = styled.button`
    background-color: #1565C0;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
        background-color: #1A73E8;
    }
`;

export default function ErrorPage() {
    return (
        <div className="fullContainer">
            <SidebarLayout>
                <ErrorPageContainer>
                    <ErrorTitle>404 Not Found</ErrorTitle>
                    <ErrorDescription>
                        The page you are looking for does not exist or has been removed.
                        Please check the URL or try searching for something else.
                    </ErrorDescription>
                    <ErrorButton onClick={() => window.history.back()}>Go Back</ErrorButton>
                </ErrorPageContainer>
            </SidebarLayout>
        </div>
    );
}
