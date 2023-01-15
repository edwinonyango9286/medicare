from channels.routing import ProtocolTypeRouter, URLRouter
from chat.consumers import TextRoomConsumer
from django.urls import re_path

chat_urlpatterns = [
    re_path(r'^ws/(?p<room_name>[^/]+)/$', TextRoomConsumer.as_asgi())
]

application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            chat_urlpatterns
        )
})