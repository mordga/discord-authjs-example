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
      // Asignar rol automáticamente
      if (account?.provider === "discord" && user?.id) {
        const guildId = process.env.GUILD_ID!;
        const roleId = process.env.VERIFIED_ROLE_ID!;
        const botToken = process.env.DISCORD_BOT_TOKEN!;

        console.log(`🔄 Intentando asignar rol a usuario: ${user.id}`);

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

          if (response.ok) {
            console.log(`✅ Rol "Verificado" asignado correctamente a ${user.id}`);
          } else {
            const errorText = await response.text();
            console.error(`❌ Error al asignar rol - Código ${response.status}:`, errorText);
          }
        } catch (error: any) {
          console.error("❌ Excepción al asignar rol:", error.message);
        }
      }

      return true; // Siempre permitir el login
    },
  },
});
