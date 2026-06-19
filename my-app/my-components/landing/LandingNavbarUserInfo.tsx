"use client"
import { Tooltip, TooltipContent,  TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@auth0/nextjs-auth0/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppWindow } from "lucide-react";

export default function LandingNavbarUserInfo({ user }: { user: User }) {

	return (
		<div className="flex gap-2 items-center">
			<Link
				href={`/${user.email}/dashboard`}
			>
				<Button size={"sm"}>
				<AppWindow />
					Dashboard
				</Button>
			</Link>
			<Link
				href="/auth/logout"
			>
				<Button size={"sm"} variant={"destructive"}>
					Log out
				</Button>
			</Link>
				<Tooltip>
					<TooltipTrigger asChild>
						<Avatar>
							<AvatarImage src={"https://github.com/shadcn.png"} alt="default-avatar" />
							<AvatarFallback>FALL</AvatarFallback>
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>
						{user.nickname} Profile
					</TooltipContent>
				</Tooltip>
		</div>


	)
}
