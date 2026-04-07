// auth.ts
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: { params: { scope: "identify" } }, // solo necesitamos identify
    }),
  ],

  callbacks: {
  async signIn({ user, account }) {
    if (account?.provider === "discord" && user?.id) {
      console.log("🔄 Intentando asignar rol a:", user.id); // esto debería aparecer en la consola del navegador

      const guildId = process.env.GUILD_ID!;
      const roleId = process.env.VERIFIED_ROLE_ID!;
      const botToken = process.env.DISCORD_BOT_TOKEN!;

      try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${user.id}/roles/${roleId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bot ${botToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Respuesta de Discord:", response.status);

        if (response.ok) {
          console.log("✅ Rol asignado correctamente");
        } else {
          const errorText = await response.text();
          console.error("❌ Error Discord:", response.status, errorText);
        }
      } catch (error) {
        console.error("❌ Excepción:", error);
      }
    }
    return true;
  },
},
          if (response.ok) {
            console.log(`✅ Rol "Verificado" asignado correctamente a ${user.id}`);
          } else {
            const errorText = await response.text();
            console.error("❌ Error al asignar rol:", errorText);
          }
        } catch (error) {
          console.error("❌ Error en asignación de rol:", error);
        }
      }

      // Siempre permitimos el login
      return true;
    },
  },

  // Opcional: página de éxito después del login
  pages: {
    signIn: "/", // tu página principal con el botón
  },
});
