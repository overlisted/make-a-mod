package $TEMPLATE_GRADLE_GROUP;

import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod("$TEMPLATE_MODID")
public class $TEMPLATE_MOD_CLASS_NAME {
  private static final Logger LOGGER = LogManager.getLogger();

  public $TEMPLATE_MOD_CLASS_NAME() {
    MinecraftForge.EVENT_BUS.register(this);
  }

  @Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD)
  public static class RegistryEvents {

  }
}
