import Icon from '@expo/vector-icons/AntDesign';
import { Button } from '@ant-design/react-native';
import { colors } from '@/constants/colors';
import { Href, Link } from "expo-router";
import { GestureResponderEvent } from 'react-native';

type ButtonType = "primary" | "warning" | "ghost" | undefined

interface ArrowBtnProps {
    type?: ButtonType
    disabled?: boolean
    direction?: "right" | "left"
    href?: Href
    onPress?: (event: GestureResponderEvent) => void
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

export default function ArrowBtn({ type, disabled = false, direction = "right", href, onPress }: ArrowBtnProps) {
    if (href) {
        return (
            <Link href={href} asChild>
                <Button type={type} disabled={disabled} onPress={onPress} style={{            
                    width: 80,
                    height: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20
                }}>
                    <Icon name={direction === "right" ? "arrowright" : "arrowleft"} size={30} color={getIconColor(type, disabled)} />
                </Button>
            </Link>
        )
    } else {
        return (
            <Button type={type} disabled={disabled} onPress={onPress} style={{            
                width: 80,
                height: 80,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20
            }}>
                <Icon name={direction === "right" ? "arrowright" : "arrowleft"} size={30} color={getIconColor(type, disabled)} />
            </Button>
        )
    }
}