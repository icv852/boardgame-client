import Icon from '@expo/vector-icons/AntDesign';
import { Button } from '@ant-design/react-native';
import { colors } from '@/constants/colors';

type ButtonType = "primary" | "warning" | "ghost" | undefined

interface ArrowBtnProps {
    type?: ButtonType
    disabled?: boolean
}

function getIconColor(buttonType: ButtonType, disabled: boolean) {
    switch(buttonType) {
        case "primary":
            return disabled ? colors.lightGrey : colors.white
        case "warning":
            return disabled ? colors.lightGrey : colors.white
        case "ghost":
            return disabled ? colors.lightGrey : colors.blue
        default:
            return disabled ? colors.darkGrey : colors.black            
    }
}

export default function ArrowBtn({ type, disabled = false }: ArrowBtnProps) {
    return (
        <Button type={type} disabled={disabled} style={{            
            width: 80,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20
        }}>
            <Icon name="arrowright" size={30} color={getIconColor(type, disabled)} />
        </Button>
    )
}