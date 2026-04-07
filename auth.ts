// auth.ts
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
      authorization: { params: { scope: "identify" } },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "discord" && user?.id) {
        const guildId = process.env.GUILD_ID!;
        const roleId = process.env.VERIFIED_ROLE_ID!;
        const botToken = process.env.DISCORD_BOT_TOKEN!;

        console.log(`🔄 INTENTO DE ASIGNACIÓN - Usuario: ${user.id} | Guild: ${guildId} | Role: ${roleId}`);

        try {
          const response = await fetch(
            `https://discord.com/api/v10/guilds/${guildId}/members/${user.id}/roles/${roleId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bot ${botToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log(`📡 Respuesta de Discord: ${response.status} ${response.statusText}`);

          if (response.ok) {
            console.log(`✅ ¡ÉXITO! Rol asignado a ${user.id}`);
          } else {
            const errorText = await response.text();
            console.error(`❌ ERROR Discord ${response.status}:`, errorText);
          }
        } catch (error: any) {
          console.error("❌ Excepción en fetch:", error.message);
        }
      }

      return true;
    },
  },
});
